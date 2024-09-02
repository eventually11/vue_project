
// define a dummy_data class for dummy_repository to return

export class DummyData {
  private _data: string;

  constructor(data: string) {
    this._data = data;
  }

  data(): string {
    return this._data;
  }
}