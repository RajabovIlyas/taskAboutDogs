export class CreateDogDto {
  readonly breed: string;
  readonly image: string;
  readonly title: string;

  constructor(data) {
    this.breed = data.breed;
    this.image = data.image;
    this.title = data.title;
  }
}
