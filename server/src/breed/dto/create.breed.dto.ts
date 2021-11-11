export class CreateBreedDto {
  readonly title: string;

  constructor(data) {
    this.title = data.title;
  }
}
