import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<any> {
    return new ProductYupValidator();
  }
}