import { injectable, inject } from "inversify";
import TYPES from "../../container/types";
import IRepository from "../../interfaces/repositoryIF";
import IStorage from "../../interfaces/storageIF";

@injectable()
class HelloWorld {
    constructor(
        @inject(TYPES.Repository) private repository: IRepository,
        @inject(TYPES.Storage) private storage: IStorage,
    ) {}

    async handler(_event: any): Promise<any> {
        //get data from storage
        const storageData = await this.storage.get("123");

        //update repository with new data
        await this.repository.update("dummy-id", {
            name: "dummy-name",
            age: 20,
            storageData,
        });

        return "Hello World!";
    }
}

export default HelloWorld;