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
  hide: boolean;

  @ViewChild('treeselect')
  treeselect: TreeSelect;

  constructor(private nodeService: NodeService) {
    this.nodeService.getLocations().then((files) => (this.nodes = files));
  }

  ngOnInit(): void {
    this.selectedItemCount = 0;
    this.treeSelectDropdownVisible = false;
    this.hide = false;
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
    this.treeSelectDropdownVisible = !this.treeSelectDropdownVisible;
  }

  onSelectNode(e){
    this.updateCount();
  }

  onUnSelectNode(e){
    console.log('un select');
    this.hide = true;
    this.updateCount();
  }

  onHide(event) {
    console.log('hide')
    if (event === undefined && this.hide) {
      this.treeselect.overlayVisible = true;
      this.hide = !this.hide;
    }else{
      this.treeSelectDropdownVisible = !this.treeSelectDropdownVisible;
    }
  }

  onShow(event){
    this.treeSelectDropdownVisible = !this.treeSelectDropdownVisible;
  }
}
