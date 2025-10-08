import { ReservationStatus } from "@/types/Reservation"

export const STATUS = {
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    CANCELLED: "CANCELLED",
}

export const STATUS_DICT = {
    [STATUS.APPROVED]: "Approved",
    [STATUS.PENDING]: "Pending",
    [STATUS.CANCELLED]: "Cancelled",
}

export const getFormattedStatus = (status: ReservationStatus) => {
    return STATUS_DICT[status] || "Failed to retrieve status"
}