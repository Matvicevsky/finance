import { Loader } from 'lucide-react'

import { z } from 'zod'

import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { CategoryForm } from '@/features/categories/components/category-form'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useGetCategory } from '@/features/categories/api/use-get-category'

import { useConfirm } from '@/hooks/use-confirm'
import { insertCategorySchema } from '@/db/schema'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

const formSchema = insertCategorySchema.pick({
	name: true,
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
	const [ConfirmDialog, confirm] = useConfirm(
		'Are you sure?',
		'You are about to delete this category.'
	)
	const { isOpen, onClose, id } = useOpenCategory()

	const categoryQuery = useGetCategory(id)
	const editMutation = useEditCategory(id)
	const deleteMutation = useDeleteCategory(id)

	const isPending = editMutation.isPending || deleteMutation.isPending

	const isLoading = categoryQuery.isLoading

	const onSubmit = (values: FormValues) => {
		editMutation.mutate(values, {
			onSuccess: () => {
				onClose()
			},
		})
	}

	const onDelete = async () => {
		const ok = await confirm()

		if (ok) {
			deleteMutation.mutate(undefined, {
				onSuccess: () => {
					onClose()
				},
			})
		}
	}

	const defaultValues = categoryQuery?.data
		? {
				name: categoryQuery.data.name,
		  }
		: {
				name: '',
		  }

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Edit Category</SheetTitle>
						<SheetDescription>Edit an existing category.</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Loader className='size-4 text-muted-foreground animate-spin' />
						</div>
					) : (
						<CategoryForm
							id={id}
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							disabled={isPending}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
