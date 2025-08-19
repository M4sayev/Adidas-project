import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AddCategory from './category/AddCategory'
import UpdateCategory from './category/UpdateCategory '
import Modal from '../../component/ui/Modal'
import Loader from '../../component/ui/Loader'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../store/newsApi'

function buildTree(categories, parentId = null) {
  return categories
    .filter(cat => {
      const catParentId = cat.parentId === '' || cat.parentId === undefined ? null : String(cat.parentId)
      return String(parentId) === catParentId
    })
    .map(cat => ({
      ...cat,
      children: buildTree(categories, cat.id || cat._id),
    }))
}

const Category = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  const [deleteCategory] = useDeleteCategoryMutation()

  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [filterId, setFilterId] = useState('')
  const [filteredCategory, setFilteredCategory] = useState(null)
  const [filterError, setFilterError] = useState(null)

  useEffect(() => {
    if (filterId.trim() === '') {
      setFilteredCategory(null)
      setFilterError(null)
      return
    }
    if (data?.length) {
      const found = data.find(
        cat =>
          String(cat.id) === filterId.trim() ||
          String(cat._id) === filterId.trim()
      )
      if (found) {
        setFilteredCategory(found)
        setFilterError(null)
      } else {
        setFilteredCategory(null)
        setFilterError('Belə ID-li kateqoriya tapılmadı')
      }
    }
  }, [filterId, data])

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Kateqoriyanı silmək istədiyinizdən əminsiniz?')) return

    try {
      await deleteCategory(id).unwrap()
      toast.success('Kateqoriya uğurla silindi')
    } catch (error) {
      toast.error(error?.data?.message || 'Xəta baş verdi')
    }
  }

  const handleOpenUpdate = (category) => {
    setSelectedCategory(category)
    setOpenUpdate(true)
  }

  const tree = data ? buildTree(data) : []

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <li
        key={node.id || node._id}
        className="bg-gradient-to-br from-blue-900 to-white rounded-xl p-5 shadow-lg transform transition-transform hover:scale-105"
        style={{ marginLeft: level * 20 }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 truncate">{node.name}</h3>
            {node.slug && (
              <p className="text-gray-400 italic truncate select-text">{node.slug}</p>
            )}
            <p className="text-sm text-gray-300">ID: {node.id || node._id}</p>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => handleDeleteCategory(node.id || node._id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-shadow shadow-md"
              title="Sil"
            >
              🗑️ Delete
            </button>

            <button
              onClick={() => handleOpenUpdate(node)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium transition-shadow shadow-md"
              title="Yenilə"
            >
              ✏️ Update
            </button>
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <ul className="mt-4 space-y-3">
            {renderTree(node.children, level + 1)}
          </ul>
        )}
      </li>
    ))
  }

  return (
    <div className="p-6 w-full bg-gray-900 min-h-screen">
      <div className="flex justify-between mb-6 gap-3">
        <button
          onClick={() => setOpenAdd(true)}
          type="button"
          className="px-8 py-3 font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Yeni Kateqoriya əlavə et
        </button>

        <input
          type="text"
          placeholder="Kateqoriya ID-ə görə axtar"
          className="px-4 py-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-300"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
      </div>

      <Modal open={openAdd} setOpen={setOpenAdd}>
        <AddCategory setOpen={setOpenAdd} />
      </Modal>

      <Modal open={openUpdate} setOpen={setOpenUpdate}>
        {selectedCategory && <UpdateCategory category={selectedCategory} />}
      </Modal>

      <div className="flex justify-center w-full">
        {isLoading ? (
          <Loader />
        ) : filterId.trim() ? (
          filteredCategory ? (
            <ul className="w-full max-w-4xl space-y-4">
              {renderTree([filteredCategory])}
            </ul>
          ) : (
            <p className="text-red-500">{filterError}</p>
          )
        ) : data?.length ? (
          <ul className="w-full max-w-4xl space-y-4">
            {renderTree(tree)}
          </ul>
        ) : (
          <p className="text-gray-400 text-center col-span-full">Kateqoriya tapılmadı</p>
        )}
      </div>
    </div>
  )
}

export default Category
