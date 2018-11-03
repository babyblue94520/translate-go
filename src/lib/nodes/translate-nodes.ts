import { ITranslateNode } from '../translate.interface';
import { TranslateUtil } from '../translate-util';

export abstract class TranslateNodes {
    protected _nodes = [];

    abstract need(node): boolean;
    abstract getText(node): string;
    abstract setText(node, text: string);

    /**
     *
     * @param node
     */
    public indexOf(node): number {
        return this._nodes.indexOf(node);
    }

    /**
     *
     */
    public getNodes(): Array<ITranslateNode> {
        return this._nodes;
    }

    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    public add(node) {
        this._nodes.push(node);
    }

    /**
     * 移除需要翻譯的node
     * @param node
     */
    public remove(node): boolean {
        let index = this.indexOf(node);
        if (index == -1) { return false; }
        this._nodes.splice(index, 1);
        return true;
    }

    public clean() {
        this._nodes = this._nodes.filter(TranslateUtil.isConnected);
    }
}
