import styles from './promotions.module.css'

export default function PromoPreview({
    article,
    togglePreview
}: {
    article: Promo,
    togglePreview: () => void
}) {
    const {
        image,
        title,
        description,
        link
    } = article

    return (

        <div className='preview-container'>
            
            <button onClick={togglePreview}>&times;</button>

            <div className="preview-content">

                <section className={styles.promo}>

                    <h1>
                        {title}
                    </h1>

                    <img src={image} height={320} width={480} alt='' />

                    <p>
                        {description}
                    </p>

                    <p>
                        To get started, just click <a href={link}>this link</a>!
                    </p>

                </section>

            </div>

        </div>
    )
}