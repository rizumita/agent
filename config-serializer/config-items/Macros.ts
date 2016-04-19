import {ClassArray} from '../ClassArray';
import {Serializable} from '../Serializable';
import {Macro} from './Macro';
import {UhkBuffer} from '../UhkBuffer';

export class Macros extends ClassArray<Macro> {

    jsObjectToClass(jsObject: any): Serializable<Macro> {
        return new Macro().fromJsObject(jsObject);
    }

    binaryToClass(buffer: UhkBuffer): Serializable<Macro> {
        return new Macro().fromBinary(buffer);
    }

}
