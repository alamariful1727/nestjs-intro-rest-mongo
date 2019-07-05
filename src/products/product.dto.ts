export class CreateProductDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateProductDto {
  readonly title: string;
  readonly description: string;
  readonly price: number;
}
