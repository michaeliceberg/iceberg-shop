/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import { useLang } from '@/hooks/useLang'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { setCatalogCategoryOptions } from '@/context/catalog'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import WatchedProducts from '@/components/modules/WatchedProducts/WatchedProducts'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { lang, translations } = useLang()
  const {
    products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithSizes,
    handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')
  const { watchedProducts } = useWatchedProducts()

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          rootCategoryOptions: [
            {
              id: 2,
              title: translations[lang].main_menu.concrete,
              href: '/catalog/concrete',
            },
            {
              id: 3,
              title: translations[lang].main_menu.asphalt,
              href: '/catalog/asphalt',
            },
            {
              id: 4,
              title: translations[lang].main_menu.souvenirs,
              href: '/catalog/souvenirs',
            },
            {
              id: 5,
              title: translations[lang].main_menu.office,
              href: '/catalog/office',
            },
          ],
        })
        break
      case 'asphalt':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.asph_b,
              filterHandler: () => handleApplyFiltersWithCategory('asph_b'),
            },
            {
              id: 2,
              title: translations[lang].comparison.asph_c,
              filterHandler: () => handleApplyFiltersWithCategory('asph_c'),
            },
            {
              id: 3,
              title: translations[lang].comparison.asph_a,
              filterHandler: () => handleApplyFiltersWithCategory('asph_a'),
            },
          ],
        })
        break
      case 'concrete':
        setCatalogCategoryOptions({
          concreteCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.bstgraviy,
              filterHandler: () => handleApplyFiltersWithCategory('bstgraviy'),
            },
            {
              id: 2,
              title: translations[lang].comparison.bstgranit,
              filterHandler: () => handleApplyFiltersWithCategory('bstgranit'),
            },
            {
              id: 3,
              title: translations[lang].comparison.keramzitobeton,
              filterHandler: () =>
                handleApplyFiltersWithCategory('keramzitobeton'),
            },
            {
              id: 4,
              title: translations[lang].comparison.rastvor,
              filterHandler: () => handleApplyFiltersWithCategory('rastvor'),
            },
            {
              id: 5,
              title: translations[lang].comparison.dorozhnotransportniy,
              filterHandler: () =>
                handleApplyFiltersWithCategory('dorozhnotransportniy'),
            },
            {
              id: 6,
              title: translations[lang].comparison.bstmodif,
              filterHandler: () => handleApplyFiltersWithCategory('bstmodif'),
            },
          ],
        })
        break
      default:
        break
    }
  }, [lang])

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
      />
      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
      />
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
      {!!watchedProducts.items?.length && (
        <WatchedProducts watchedProducts={watchedProducts} />
      )}
    </>
  )
}

export default ProductsPage
