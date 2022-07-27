import DxfBlock from './DxfBlock';
import TagsManager from '../../Internals/TagsManager';
import DxfInterface from '../../Internals/Interfaces/DxfInterface';
import DxfTablesSection from '../TablesSection/DxfTablesSection';
import DxfObjectsSection from '../ObjectsSection/DxfObjectsSection';

export default class DxfBlocksSection implements DxfInterface {
	readonly blocks: DxfBlock[] = [];
	readonly modelSpace: DxfBlock;
	readonly paperSpace: DxfBlock;
	readonly tables: DxfTablesSection;

	constructor(tables: DxfTablesSection, objects: DxfObjectsSection) {
		this.tables = tables;
		this.modelSpace = this.addBlock('*Model_Space', objects);
		this.paperSpace = this.addBlock('*Paper_Space', objects);
		this.modelSpace.stringifyEntities = false;
	}

	addBlock(name: string, objects: DxfObjectsSection): DxfBlock {
		const blockRecord = this.tables.addBlockRecord(name);
		const block = new DxfBlock(name, objects);
		block.ownerObjectHandle = blockRecord.handle;
		this.blocks.push(block);
		return block;
	}

	get manager(): TagsManager {
		const manager = new TagsManager();
		manager.sectionStart('BLOCKS');
		for (let i = 0; i < this.blocks.length; i++) {
			manager.append(this.blocks[i]);
		}
		manager.sectionEnd();
		return manager;
	}

	stringify(): string {
		return this.manager.stringify();
	}
}
