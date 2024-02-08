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
  treeSelectDropdownVisible: boolean;

  @ViewChild('treeselect')
  treeselect: TreeSelect;

  constructor(private nodeService: NodeService) {
    this.nodeService.getLocations().then((files) => (this.nodes = files));
  }

  ngOnInit(): void {
    this.selectedItemCount = 0;
    this.treeSelectDropdownVisible = false;
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

  getTreeSelectStatus(){
   return this.treeSelectDropdownVisible;
  }

  getText() {
    return this.selectedItemCount > 0 ? `${this.selectedItemCount} ლოკაცია არის არჩეული` : 'აირჩიეთ ლოკაცია';
  }

  updateCount() {
    this.selectedItemCount = this.countLeaves(this.selectedNodes);
  }

  onClear() {
    this.updateCount();
  }

  onReset() {
    this.selectedNodes = null;
    this.updateCount();
  }

  onApprove() {
    this.treeselect.overlayVisible = false;
  }

  onSelectNode(e){
    this.updateCount();
  }

  onUnSelectNode(e){
    this.updateCount();
  }

  onHide(event) {
    if (event === undefined) {
      this.treeselect.overlayVisible = true;
    }
    this.treeSelectDropdownVisible = false;
  }

  onShow(event){
    this.treeSelectDropdownVisible = true;
  }
}
