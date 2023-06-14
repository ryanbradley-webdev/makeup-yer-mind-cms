import { Dispatch, SetStateAction } from 'react'

export default function PromoPreview({
    article,
    togglePreview
}: {
    article: Promo,
    togglePreview: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div>PromoPreview</div>
    )
}