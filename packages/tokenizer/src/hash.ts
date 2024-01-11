import {hash as hash_md5} from 'spark-md5';

export function hash(value: string): string {
	return hash_md5(value);
}
