import v, { Vec3 } from 'vec3'

export function getVectorIntermediateX(origin: Vec3, v: Vec3, x: number): Vec3 | null

export function getVectorIntermediateY(origin: Vec3, v: Vec3, y: number): Vec3 | null

export function getVectorIntermediateZ(origin: Vec3, v: Vec3, z: number): Vec3 | null

export class AxisAlignedBB {
	min: Vec3
	max: Vec3

	constructor(min: Vec3, max: Vec3)

	clone(): AxisAlignedBB

	extend(dx: number, dy: number, dz: number): AxisAlignedBB

	contract(x: number, y: number, z: number): AxisAlignedBB

	expand(x: number, y: number, z: number): AxisAlignedBB

	offset(x: number, y: number, z: number): AxisAlignedBB

	computeOffsetX(bb: AxisAlignedBB, x: number): number

	computeOffsetY(bb: AxisAlignedBB, y: number): number

	computeOffsetZ(bb: AxisAlignedBB, z: number): number

	isVectorInYZ(v: Vec3): boolean

	isVectorInXZ(v: Vec3): boolean

	isVectorInXY(v: Vec3): boolean

	intersects(bb: AxisAlignedBB): boolean

	isVectorInside(v: Vec3): boolean

	calculateIntercept(a: Vec3, b: Vec3): Vec3 | null
}
