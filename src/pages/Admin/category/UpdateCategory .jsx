import React, { useState, useEffect } from 'react'
import { useUpdateCategoryWithSubsMutation, useGetCategoriesQuery } from '../../../store/newsApi'
import { toast } from 'react-toastify'

const UpdateCategory = ({ category }) => {
  const [name, setName] = useState(category.name)
  const [slug, setSlug] = useState(category.slug)
  const [parentId, setParentId] = useState(category.parentId || '')
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  const [updateCategoryWithSubs, { isLoading: updating }] = useUpdateCategoryWithSubsMutation()

  useEffect(() => {
    setName(category.name)
    setSlug(category.slug)
    setParentId(category.parentId || '')
  }, [category])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateCategoryWithSubs({ id: category._id || category.id, name, slug, parentId: parentId || null }).unwrap()
      toast.success('Kateqoriya uğurla yeniləndi')
    } catch (error) {
      toast.error(error?.data?.message || 'Xəta baş verdi')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Ad</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Parent Kateqoriya (Opsional)</label>
        {isLoading && <p>Yüklənir...</p>}
        {error && <p className="text-red-500">Kateqoriyalar yüklənmədi</p>}
        {!isLoading && !error && (
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Seçin (və ya boş buraxın)</option>
            {categories
              ?.filter((cat) => (cat._id || cat.id) !== (category._id || category.id)) // Özünü seçmə
              .map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={updating}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Yenilə
      </button>
    </form>
  )
}

export default UpdateCategory
