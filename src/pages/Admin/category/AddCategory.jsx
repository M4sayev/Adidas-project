import React, { useState } from 'react'
import { useAddCategoryMutation, useGetCategoriesQuery } from '../../../store/newsApi'
import { toast } from 'react-toastify'

const AddCategory = ({ setOpen }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [parentId, setParentId] = useState('')

  const [addCategory] = useAddCategoryMutation()
  const { data: categories, error, isLoading } = useGetCategoriesQuery()

  React.useEffect(() => {
    if (categories) {
      console.log('Categories data:', categories)
      console.log('Categories array length:', categories.length)
      categories.forEach((cat, index) => {
        console.log(`Category ${index}:`, {
          name: cat.name,
          id: cat._id || cat.id,
          parentId: cat.parentId,
          hasChildren: cat.children ? cat.children.length : 0
        })
      })
    }
  }, [categories])

  
  // Kateqoriya seçimlərini hierarxik şəkildə göstərən funksiya
const renderCategoryOptions = (categoryList, parentCategory = null, depth = 0) => {
  if (!categoryList || !Array.isArray(categoryList)) {
    console.log('CategoryList problem:', categoryList)
    return []
  }

  const filteredCategories = categoryList.filter(category => category.parentId === parentCategory)
  const options = []

  filteredCategories.forEach(category => {
    const categoryId = category._id || category.id
    const indentation = '  '.repeat(depth) + (depth > 0 ? '└─ ' : '')
    const displayName = `${indentation}${category.name}`

    // Cari kateqoriyanı əlavə et
    options.push(
      <option key={categoryId} value={categoryId}>
        {displayName}
      </option>
    )

    // Əgər yalnız birinci səviyyə children göstərmək istəyirik
    if (depth === 0 && category.children && Array.isArray(category.children) && category.children.length > 0) {
      category.children.forEach(child => {
        const childId = child._id || child.id
        options.push(
          <option key={childId} value={childId}>
            {'  '.repeat(depth + 1) + '└─ '}{child.name}
          </option>
        )
      })
    }
  })

  return options
}



  // Slug-ı avtomatik yaratmaq üçün funksiya
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u') 
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[ə]/g, 'e')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  // Ad dəyişdikdə slug-ı avtomatik yenilə
  const handleNameChange = (e) => {
    const newName = e.target.value
    setName(newName)
    if (newName && !slug) {
      setSlug(generateSlug(newName))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim()) {
      toast.error('Zəhmət olmasa ad və slug sahələrini doldurun')
      return
    }

    // Slug formatını yoxla
    const slugPattern = /^[a-z0-9-]+$/
    if (!slugPattern.test(slug)) {
      toast.error('Slug yalnız kiçik hərflər, rəqəmlər və tire işarəsi daxil edə bilər')
      return
    }

    try {
      const categoryData = {
        name: name.trim(),
        slug: slug.trim(),
        parentId: parentId || null  // Seçilmiş kateqoriyanın ID-si parent olaraq göndərilir
      }

  

      await addCategory(categoryData).unwrap()
      
      // Parent kateqoriya varsa mesajda göstər
      const parentCategory = categories?.find(cat => 
        (cat._id || cat.id) === parentId
      )
      
      const successMessage = parentCategory 
        ? `"${parentCategory.name}" kateqoriyasına alt kateqoriya kimi "${name}" əlavə olundu`
        : `"${name}" əsas kateqoriya kimi əlavə olundu`
      
      toast.success(successMessage)
      
      // Formu təmizlə və modal-ı bağla
      setName('')
      setSlug('')
      setParentId('')
      setOpen(false)
    } catch (err) {
      console.error('Kateqoriya əlavə etmə xətası:', err)
      toast.error(err?.data?.message || 'Kateqoriya əlavə edilərkən xəta baş verdi')
    }
  }

  // Kateqoriya sayını hesabla
  const getCategoryStats = () => {
    if (!categories) return { total: 0, main: 0, sub: 0 }
    
    const mainCategories = categories.filter(cat => !cat.parentId)
    const subCategories = categories.filter(cat => cat.parentId)
    
    return {
      total: categories.length,
      main: mainCategories.length,
      sub: subCategories.length
    }
  }

  const stats = getCategoryStats()

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-2 text-center">
        Yeni Kateqoriya Əlavə Et
      </h2>
      
      {/* Kateqoriya statistikası */}
      <div className="text-center text-blue-200 text-sm mb-4">
        Cəmi: {stats.total} | Əsas: {stats.main} | Alt: {stats.sub}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Kateqoriya Adı *
          </label>
          <input
            type="text"
            placeholder="Məsələn: Texnologiya"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Slug (URL-də göstəriləcək) *
          </label>
          <input
            type="text"
            placeholder="texnologiya"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <small className="text-blue-200 text-xs mt-1">
            Yalnız kiçik hərflər, rəqəmlər və tire (-) işarəsi
          </small>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Parent Kateqoriya (İstəyə görə)
          </label>
          
          {isLoading && (
            <div className="text-center text-white py-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Kateqoriyalar yüklənir...
            </div>
          )}
          
          {error && (
            <p className="text-red-300 text-sm">
              Kateqoriyalar yüklənmədi: {error.message}
            </p>
          )}
          
          {!isLoading && !error && (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">-- Əsas kateqoriya yaratmaq üçün boş buraxın --</option>
              {renderCategoryOptions(categories)}
            </select>
          )}
          
          <small className="text-blue-200 text-xs mt-1">
            Seçilmiş kateqoriyanın alt kateqoriyası yaradılacaq
          </small>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Ləğv et
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Əlavə Et
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory