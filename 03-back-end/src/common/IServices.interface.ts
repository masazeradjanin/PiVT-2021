import AdministratorService from "../components/administrator/service";
import CartService from "../components/cart/service";
import CategoryService from "../components/category/service";
import CompanyService from "../components/company/service";
import FurnitureService from "../components/furniture/service";
import UserService from "../components/user/service";

export default interface IServices {
    categoryService: CategoryService;
    furnitureService: FurnitureService;
    administratorService: AdministratorService;
    userService: UserService;
    cartService: CartService;
    companyService: CompanyService;
    
   
}