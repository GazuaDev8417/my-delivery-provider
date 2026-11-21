import { useEffect, useMemo, useState } from "react"
import type { Order } from "../types/types"


const ALERT_DELAY_MS = 60_000


export const usePaidOrderAlerts = (orders: Order[]):Set<string>=>{
    const [now, setNow] = useState(() => Date.now())

    const candidates = useMemo(()=>{
        return orders.flatMap(order=>{
            const approvedAtValue = order.payment_approved_at

            if(
                order.state !== 'REQUESTED' ||
                order.payment_status !== 'APPROVED' ||
                !approvedAtValue
            ){
                return []
            }

            const appvrovedAt = approvedAtValue instanceof Date
                ? approvedAtValue.getTime()
                : Date.parse(approvedAtValue)

            if(!Number.isFinite(appvrovedAt)) return []

            return [{
                id: order.id,
                alertAt: appvrovedAt + ALERT_DELAY_MS
            }]
        })
    }, [orders])


    useEffect(()=>{
        const nextAlertAt = candidates.reduce(
            (next, candidate) =>
                candidate.alertAt > now
                    ? Math.min(next, candidate.alertAt)
                    : next,
                Number.POSITIVE_INFINITY
        )

        if(!Number.isFinite(nextAlertAt)) return

        const timoutId = window.setTimeout(
            () => setNow(Date.now()),
            Math.max(0, nextAlertAt - Date.now())
        )

        return () => window.clearTimeout(timoutId)
    }, [candidates, now])

    return useMemo(
        () => new Set(
            candidates
                .filter(candidate => candidate.alertAt <= now)
                .map(candidate => candidate.id)
        ),
        [candidates, now]
    )
}