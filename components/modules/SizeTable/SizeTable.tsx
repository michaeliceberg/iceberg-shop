/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import toast from 'react-hot-toast'
import { useUnit } from 'effector-react'
import { useCartAction } from '@/hooks/useCartAction'
import { closeSizeTableByCheck, isUserAuth } from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import AddToCartBtn from '../ProductsListItem/AddToCartBtn'
import ProductCountBySize from '../ProductsListItem/ProductCountBySize'
import { addProductToFavorites } from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { addFavoriteItemToLS } from '@/lib/utils/favorites'
import { useFavoritesAction } from '@/hooks/useFavoritesAction'
import { $isAddToFavorites, $favorites, $favoritesFromLS } from '@/context/favorites/state'
import { $showQuickViewModal } from '@/context/modals/state'
import { $sizeTableSizes } from '@/context/sizeTable/state'
import styles from '@/styles/size-table/index.module.scss'

const SizeTable = () => {
  const { lang, translations } = useLang()
  const showQuickViewModal = useUnit($showQuickViewModal)
  const isAddToFavorites = useUnit($isAddToFavorites)
  const {
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    cartItemBySize,
    addToCartSpinner,
    currentCartItems,
    updateCountSpinner,
    product
  } = useCartAction(true)
  const { addToFavoritesSpinner, setAddToFavoritesSpinner } = useFavoritesAction(product)
  const productSizes = useUnit($sizeTableSizes)
  // const isasph_cType = productSizes.type === 'asph_c'
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentFavoriteItems = currentFavoritesByAuth.filter(
    (item) => item.productId === product._id
  )
  const favoriteItemBySize = currentFavoriteItems.find(
    (item) => item.size === selectedSize
  )

  const handleSelectSSize = () => setSelectedSize('БЕЗ')

  const handleSelectLSize = () => setSelectedSize('ПМД5')

  const handleSelectMSize = () => setSelectedSize('ПМД10')

  const handleSelectXLSize = () => setSelectedSize('ПМД15')

  const handleSelectXXLSize = () => setSelectedSize('ПМД20')

  const handleSelectXXXLSize = () => setSelectedSize('ПМД25')

  const isSizeSelected = (size: string) => selectedSize === size

  const checkInFavorites = (size: string) => currentFavoriteItems.find((item) => item.size === size)

  // const asph_cSizes = [
  //   {
  //     id: 1,
  //     headCircumference: '55',
  //     manufacturerSize: 'S',
  //     selectHandler: handleSelectSSize,
  //     isSelected: isSizeSelected('s'),
  //     isAvailable: productSizes.sizes.s,
  //     isInFavorites: checkInFavorites('s'),
  //   },
  //   {
  //     id: 2,
  //     headCircumference: '56-57',
  //     manufacturerSize: 'M',
  //     selectHandler: handleSelectMSize,
  //     isSelected: isSizeSelected('m'),
  //     isAvailable: productSizes.sizes.m,
  //     isInFavorites: checkInFavorites('m'),
  //   },
  //   {
  //     id: 3,
  //     headCircumference: '58-59',
  //     manufacturerSize: 'L',
  //     selectHandler: handleSelectLSize,
  //     isSelected: isSizeSelected('l'),
  //     isAvailable: productSizes.sizes.l,
  //     isInFavorites: checkInFavorites('l'),
  //   },
  //   {
  //     id: 4,
  //     headCircumference: '60-61',
  //     manufacturerSize: 'XL',
  //     selectHandler: handleSelectXLSize,
  //     isSelected: isSizeSelected('xl'),
  //     isAvailable: productSizes.sizes.xl,
  //     isInFavorites: checkInFavorites('xl'),
  //   },
  //   {
  //     id: 5,
  //     headCircumference: '62-63',
  //     manufacturerSize: 'XXL',
  //     selectHandler: handleSelectXXLSize,
  //     isSelected: isSizeSelected('xxl'),
  //     isAvailable: productSizes.sizes.xxl,
  //     isInFavorites: checkInFavorites('xxl'),
  //   },
  // ]

  const dressSizes = [
    {
      id: 1,
      russianSize: '44-46',
      manufacturerSize: 'БЕЗ',
      bet_col: '-',
      bet_warm: '-',
      bet_rastv: '-',
      bust: '78-82',
      waist: '58-62',
      hipGirth: '86-90',
      selectHandler: handleSelectSSize,
      isSelected: isSizeSelected('БЕЗ'),
      isAvailable: productSizes.sizes.БЕЗ,
      isInFavorites: checkInFavorites('БЕЗ'),
    },
    // {
    //   id: 1,
    //   russianSize: '44-46',
    //   manufacturerSize: 'без',
    //   bet_col: '-',
    //   bet_warm: '-',
    //   bet_rastv: '-',
    //   bust: '78-82',
    //   waist: '58-62',
    //   hipGirth: '86-90',
    //   selectHandler: handleSelectSSize,
    //   isSelected: isSizeSelected('без'),
    //   isAvailable: productSizes.sizes.pmd_no,
    //   isInFavorites: checkInFavorites('без'),
    // },
    // {
    //   id: 2,
    //   russianSize: '48-50',
    //   manufacturerSize: '-5°',
    //   bet_col: '1,0',
    //   bet_warm: '0,5-1,0',
    //   bet_rastv: '1,0',
    //   bust: '82-86',
    //   waist: '62-66',
    //   hipGirth: '90-94',
    //   selectHandler: handleSelectMSize,
    //   isSelected: isSizeSelected('pmd_5'),
    //   isAvailable: productSizes.sizes.pmd_5,
    //   isInFavorites: checkInFavorites('pmd_5'),
    // },
    {
      id: 2,
      russianSize: '48-50',
      manufacturerSize: 'ПМД5',
      bet_col: '1,0',
      bet_warm: '0,5-1,0',
      bet_rastv: '1,0',
      bust: '82-86',
      waist: '62-66',
      hipGirth: '90-94',
      selectHandler: handleSelectMSize,
      isSelected: isSizeSelected('ПМД5'),
      isAvailable: productSizes.sizes.ПМД5,
      isInFavorites: checkInFavorites('ПМД5'),
    },
    {
      id: 3,
      russianSize: '50',
      manufacturerSize: 'ПМД10',
      bet_col: '2,0',
      bet_warm: '0,5-1,0',
      bet_rastv: '2,0',
      bust: '86-90',
      waist: '66-70',
      hipGirth: '94-98',
      selectHandler: handleSelectLSize,
      isSelected: isSizeSelected('ПМД10'),
      isAvailable: productSizes.sizes.ПМД10,
      isInFavorites: checkInFavorites('ПМД10'),
    },
    {
      id: 4,
      russianSize: '52-54',
      manufacturerSize: 'ПМД15',
      bust: '90-94',
      bet_col: '3,0',
      bet_warm: '0,5-1,0',
      bet_rastv: '3,0-4,0',
      waist: '70-74',
      hipGirth: '98-102',
      selectHandler: handleSelectXLSize,
      isSelected: isSizeSelected('ПМД15'),
      isAvailable: productSizes.sizes.ПМД15,
      isInFavorites: checkInFavorites('ПМД15'),
    },
    {
      id: 5,
      russianSize: '56',
      manufacturerSize: 'ПМД20',
      bust: '94-98',
      bet_col: '4,0',
      bet_warm: '1,0-2,0',
      bet_rastv: '5,0-6,0',
      waist: '74-78',
      hipGirth: '102-106',
      selectHandler: handleSelectXXLSize,
      isSelected: isSizeSelected('ПМД20'),
      isAvailable: productSizes.sizes.ПМД20,
      isInFavorites: checkInFavorites('ПМД20'),
    },
    {
      id: 6,
      russianSize: '56',
      manufacturerSize: 'ПМД25',
      bust: '94-98',
      bet_col: '5,0',
      bet_warm: '1,0-2,0',
      bet_rastv: '6,0-7,0',
      waist: '74-78',
      hipGirth: '102-106',
      selectHandler: handleSelectXXXLSize,
      isSelected: isSizeSelected('ПМД25'),
      isAvailable: productSizes.sizes.ПМД25,
      isInFavorites: checkInFavorites('ПМД25'),
    },
  ]

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))

  const trProps = (
    item:
      | {
          id: number
          russianSize: string
          manufacturerSize: string
          bust: string
          waist: string
          hipGirth: string
          selectHandler: () => void
          isSelected: boolean
          isAvailable: boolean
        }
      | {
          id: number
          headCircumference: string
          manufacturerSize: string
          selectHandler: () => void
          isSelected: boolean
          isAvailable: boolean
        }
  ) => ({
    onClick: item.selectHandler,
    style: {
      backgroundColor:
        item.isSelected || selectedSize === item.manufacturerSize.toLowerCase()
          ? '#9466FF'
          : 'transparent',
      pointerEvents: item.isAvailable ? 'auto' : 'none',
      opacity: item.isAvailable ? 1 : 0.5,
      color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
    },
  })

  const handleAddProductToFavorites = () => {
    if (!isUserAuth()) {
      addFavoriteItemToLS(product, selectedSize)
      return
    }

    if (favoriteItemBySize) {
      toast.success('Добавлено в избранное!')
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const clientId = addFavoriteItemToLS(product, selectedSize, false)

    addProductToFavorites({
      jwt: auth.accessToken,
      productId: product._id,
      setSpinner: setAddToFavoritesSpinner,
      size: selectedSize,
      category: product.category,
      clientId,
    })
  }

  return (
    <div
      className={`${styles.size_table} ${
        styles.size_table_asph_c }`}
    >
      <button
        className={`btn-reset ${styles.size_table__close}`}
        onClick={handleCloseSizeTable}
      />
      <h2 className={styles.size_table__title}>
        {translations[lang].size_table.title}
      </h2>
      <div className={styles.size_table__inner}>
        <table className={styles.size_table__table}>
          <thead>
            {
              <tr>
                <th>{translations[lang].size_table.manufacturer_size}</th>
              </tr>
            }
          </thead>
          <tbody>
            {dressSizes.map((item) => (
              <tr
                    key={item.id}
                    {...(trProps(
                      item
                    ) as React.HTMLAttributes<HTMLTableRowElement>)}
                  >
                {/* <td>
                    {item.isInFavorites && (
                      <span className={styles.size_table__favorite} />
                      )}
                    {item.russianSize}
                  </td> */}
                {item.isInFavorites && (
                  <span className={styles.size_table__favorite} />
                      )}
                <ProductCountBySize
                        size={item.manufacturerSize}
                        products={currentCartItems}
                      />
                <td>{item.manufacturerSize}</td>
                {/* <td>{item.bust}</td> */}
                {/* <td>{item.waist}</td> */}
                {/* <td>
                  <ProductCountBySize
                        size={item.manufacturerSize}
                        products={currentCartItems}
                      />
                  {item.hipGirth}
                </td> */}
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddToCartBtn
        className={`${styles.size_table__btn} ${styles.size_table__btn_favorite}`}
        handleAddToCart={isAddToFavorites ? handleAddProductToFavorites : addToCart}
        addToCartSpinner={addToCartSpinner || updateCountSpinner || addToFavoritesSpinner}
        btnDisabled={!!!selectedSize || addToCartSpinner || updateCountSpinner || addToFavoritesSpinner}
        text={isAddToFavorites ? translations[lang].product.to_favorite : translations[lang].product.to_cart}
      />
    </div>
  )
}

export default SizeTable
