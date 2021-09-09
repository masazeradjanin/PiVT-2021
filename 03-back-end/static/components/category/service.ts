import CategoryModel from "./model";

class CategoryService{
    public async getAll(): Promise<CategoryModel[]> {
        const lista: CategoryModel[] = []
        lista.push({
            categoryId: 1,
            name: "ja",
            imagePath: "static/categories/1.png",
            parentCategoryId: null,
            parentCategory: null,
            subcategories: [],
        }


        );
        return lista;
    }

}

export default CategoryService;