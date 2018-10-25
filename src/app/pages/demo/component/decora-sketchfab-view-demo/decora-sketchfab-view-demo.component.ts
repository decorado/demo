import { Component, OnInit, ViewChild } from '@angular/core';
import { DecSketchfabViewComponent } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-sketchfab-view-demo',
  templateUrl: './decora-sketchfab-view-demo.component.html',
  styleUrls: ['./decora-sketchfab-view-demo.component.scss']
})
export class DecoraSketchfabViewDemoComponent implements OnInit {

  // sketchfabId = 'fb3a21e6d2da4566bc116835f9c314f9'; // balcão
  sketchfabId = '5b279e9cdeb34b7f8b647dc34ee6cdc1'; // vaso sanitario metalico

  selectedMaterial;

  innerFactor;

  channels;

  @ViewChild(DecSketchfabViewComponent) sketchfabViewer: DecSketchfabViewComponent;

  constructor() { }

  ngOnInit() {
  }


  onMaterialSelected($event, factor = 0) {

    this.selectedMaterial = $event;

    this.innerFactor = factor;

    const channels = Object.keys(this.selectedMaterial.channels);

    this.channels = channels.map(channelName => {
      const channel = this.selectedMaterial.channels[channelName];
      return {
        name: channelName,
        model: channel,
      };
    });

  }

  testaColor() {
    const color = [239, 63, 84];
    this.setMaterialColor(color);
  }

  testaRough() {
    const factor = 1;
    this.setMaterialRoughness(factor);
  }

  testaMetal() {
    const factor = 1;
    this.setMaterialMetalness(factor);
  }

  setMaterial() {
    this.sketchfabViewer.api.setMaterial(this.selectedMaterial);
  }

  testaTexture() {
    const texture = {
      internalFormat: 'RGB',
      magFilter: 'LINEAR',
      minFilter: 'LINEAR_MIPMAP_LINEAR',
      texCoordUnit: 0,
      textureTarget: 'TEXTURE_2D',
      uid: '618c42b298db4c5c9544780361380964',
      wrapS: 'REPEAT',
      wrapT: 'REPEAT',
    };

    this.setMaterialTexture(texture);

  }

  testaHighlight() {
    console.log('testaHighlight', this.selectedMaterial);
    this.sketchfabViewer.selectEffect(this.selectedMaterial);
  }

  private setMaterialColor(color) {
    console.log('this.selectedMaterial', this.selectedMaterial);
    this.sketchfabViewer.setMaterialColor(this.selectedMaterial, color);
  }

  private setMaterialRoughness(factor) {
    this.sketchfabViewer.setMaterialRoughness(this.selectedMaterial, factor);
  }

  private setMaterialMetalness(factor) {
    this.sketchfabViewer.setMaterialMetalness(this.selectedMaterial, factor);
  }

  private setMaterialTexture(texture) {
    this.sketchfabViewer.setMaterialAlbedoPBRTexture(this.selectedMaterial, texture);
  }

}


/*
  RoughnessPBR
    enable: true
    factor: 1
    texture:
      internalFormat: "LUMINANCE"
      magFilter: "LINEAR"
      minFilter: "LINEAR_MIPMAP_LINEAR"
      texCoordUnit: 0
      textureTarget: "TEXTURE_2D"
      uid: "c3a69638e2d3479c81c58536873774e9"
      wrapS: "REPEAT"
      wrapT: "REPEAT"

  MetalnessPBR:
    enable: true
    factor: 1
      texture:
        internalFormat: "LUMINANCE"
        magFilter: "LINEAR"
        minFilter: "LINEAR_MIPMAP_LINEAR"
        texCoordUnit: 0
        textureTarget: "TEXTURE_2D"
        uid: "8f19af81b07c41daab298723b5619813"
        wrapS: "REPEAT"
        wrapT: "REPEAT"
          */
