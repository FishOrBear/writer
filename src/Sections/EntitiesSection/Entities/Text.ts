import { BoundingBox, boundingBox_t } from 'Internals/BoundingBox';
import { Dxfier } from 'Internals/Dxfier';
import { vec3_t } from 'Internals/Helpers';
import Entity, { CommonEntityOptions } from '../Entity';

export class Text extends Entity {
	position: vec3_t;
	height: number;
	value: string;
	textStyle: string;

	constructor(position: vec3_t, height: number, value: string, options?: CommonEntityOptions) {
		super('TEXT', 'AcDbText', options);
		this.position = position;
		this.height = height;
		this.value = value;
		this.textStyle = 'STANDARD';
	}

	override boundingBox(): boundingBox_t {
		// I have no idea how to get boundingBox of TEXT :(
		return BoundingBox.pointBBox(this.position);
	}

	override dxfy(dx: Dxfier): void {
		super.dxfy(dx);
		dx.point3d(this.position);
		dx.push(40, this.height);
		dx.primaryText(this.value);
		dx.textStyle(this.textStyle);
		dx.subclassMarker('AcDbText');
	}
}
