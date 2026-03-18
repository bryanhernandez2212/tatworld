/**
 * LocalStorage-based booking requests store.
 * Manages booking requests lifecycle: pending → quoted → accepted → paid → scheduled → confirmed / cancelled
 */
import { useState, useEffect, useCallback } from "react";

export type BookingStatus =
  | "pending"      // Solicitud enviada, esperando cotización
  | "quoted"       // Cotización recibida, esperando aceptación
  | "accepted"     // Cotización aceptada, esperando pago
  | "paid"         // Depósito pagado, falta agendar
  | "scheduled"    // Cita agendada
  | "confirmed"    // Cita confirmada con calendario
  | "cancelled";   // Cancelada

export interface BookingRequest {
  id: string;
  artistSlug: string;
  artistName: string;
  artistImage: string;
  createdAt: string;
  status: BookingStatus;
  // Request data
  style: string;
  ideaType: "general" | "specific";
  description: string;
  sizeWidth: number;
  sizeHeight: number;
  // Quote data (filled when status >= quoted)
  quoteAmount?: number;
  depositAmount?: number;
  estimatedHours?: number;
  quoteNotes?: string;
  // Schedule data (filled when status >= scheduled)
  selectedDate?: string;
  selectedTime?: string;
}

const STORAGE_KEY = "tatts_booking_requests";

function loadRequests(): BookingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRequests(requests: BookingRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function useBookingRequests() {
  const [requests, setRequests] = useState<BookingRequest[]>(loadRequests);

  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  // Sync across hook instances via storage events and polling
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setRequests(loadRequests());
      }
    };
    window.addEventListener("storage", onStorage);

    // Poll every 2s to catch same-tab updates from other hook instances
    const interval = setInterval(() => {
      const stored = loadRequests();
      setRequests((prev) => {
        const prevJson = JSON.stringify(prev);
        const storedJson = JSON.stringify(stored);
        return prevJson !== storedJson ? stored : prev;
      });
    }, 2000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  const addRequest = useCallback((req: Omit<BookingRequest, "id" | "createdAt" | "status">) => {
    const newReq: BookingRequest = {
      ...req,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setRequests((prev) => [newReq, ...prev]);

    // Simulate quote arriving after 5 seconds (writes directly to localStorage)
    setTimeout(() => {
      const current = loadRequests();
      const updated = current.map((r) => {
        if (r.id !== newReq.id || r.status !== "pending") return r;
        const area = r.sizeWidth * r.sizeHeight;
        const basePrice = 2000;
        const pricePerCm2 = 20;
        const quote = Math.round(basePrice + area * pricePerCm2);
        return {
          ...r,
          status: "quoted" as BookingStatus,
          quoteAmount: quote,
          depositAmount: Math.round(quote * 0.3),
          estimatedHours: Math.max(1, Math.round(area / 30)),
          quoteNotes: `Tatuaje estilo ${r.style}, ${r.sizeWidth}×${r.sizeHeight}cm. Incluye diseño personalizado.`,
        };
      });
      saveRequests(updated);
    }, 5000);

    return newReq.id;
  }, []);

  const updateRequest = useCallback((id: string, updates: Partial<BookingRequest>) => {
    setRequests((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, ...updates } : r));
      saveRequests(updated);
      return updated;
    });
  }, []);

  const cancelRequest = useCallback((id: string) => {
    setRequests((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status: "cancelled" as BookingStatus } : r));
      saveRequests(updated);
      return updated;
    });
  }, []);

  const refresh = useCallback(() => {
    setRequests(loadRequests());
  }, []);

  return { requests, addRequest, updateRequest, cancelRequest, refresh };
}
