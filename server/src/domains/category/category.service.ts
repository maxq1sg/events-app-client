import { ECategory } from "./types/index";
import { getConnection } from "typeorm";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import Category from "./category.model";
import CategoryRepository from "./category.repository";

@Service()
class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: CategoryRepository
  ) {}

  addNewCategory(name: string) {
    const newCategory = this.categoryRepository.create({ name });
    return newCategory.save();
  }
  getAllCategories() {
    return this.categoryRepository.find();
  }

  getEventsPerCategory(id: number) {
    return this.categoryRepository.findOne(id, { relations: ["events"] });
  }

  static seedCategories() {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(Object.keys(ECategory).map((category) => ({ name: category })))
      .returning("id")
      .execute();
  }
  static clearAllCategories() {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(Category)
      .execute();
  }
}
export default CategoryService;
