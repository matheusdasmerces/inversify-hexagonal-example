import { injectable } from "inversify";
import IRepository from "../../../../../src/interfaces/repositoryIF";

@injectable()
class LocalRepository implements IRepository {
    async update(id: string, data: any): Promise<void> {
        // Mock implementation
    }
}

export default LocalRepository;