import { Component, OnInit, ViewChild } from '@angular/core';
import { NodeService } from '../../service/nodeservice';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'tree-select-checkbox-demo',
  templateUrl: './tree-select-checkbox-demo.html',
})
export class TreeSelectCheckboxDemo implements OnInit {
  nodes!: any[];

  selectedNodes: any;
  selectedItemCount: number;

  @ViewChild('treeselect')
  treeselect: any;

  constructor(private nodeService: NodeService) {
    this.nodeService.getFiles().then((files) => (this.nodes = files));
  }

  ngOnInit(): void {
    this.selectedItemCount = 0;
  }

  countLeaves(nodeObject: any): number {
    let cnt = 0;

    if (nodeObject == null) return cnt;

    Object.keys(nodeObject).forEach((key) => {
      const item = nodeObject[key];
      if (item.children === undefined) {
        cnt += 1;
      }
    });

    return cnt;
  }

  getText() {
    return this.selectedItemCount > 0
      ? `${this.selectedItemCount} item selected`
      : 'Please select item';
  }

  updateCount() {
    this.selectedItemCount = this.countLeaves(this.selectedNodes);
  }

  onClear() {
    this.updateCount();
  }

  onCancel() {
    this.selectedNodes = null;
    this.updateCount();
    this.treeselect.hide();
  }

  onApprove() {
    this.treeselect.hide();
  }
}
