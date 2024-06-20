import { useLang } from '@/hooks/useLang'
import { IProductSubtitleProps } from '@/types/elements'

const ProductSubtitle = ({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) => {
  const { lang, translations } = useLang()
  const descriptionSlicePosition = lang === 'ru' ? 9 : 8

  return (
    <div className={subtitleClassName}>
      <div className={subtitleRectClassName} />
      <br />
      <br />
      <span>
        {translations[lang].main_page.hero_description.slice(
          0,
          descriptionSlicePosition
        )}
      </span>
      <br />
      <span>
        {translations[lang].main_page.hero_description.slice(
          descriptionSlicePosition
        )}
      </span>
    </div>
  )
}

export default ProductSubtitle
