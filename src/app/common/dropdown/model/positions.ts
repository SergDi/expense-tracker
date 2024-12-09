
import { ConnectedPosition } from '@angular/cdk/overlay';

export enum PositionTypeEnum {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    rightTop = 'rightTop',
    leftTop = 'leftTop',
    rightBottom = 'rightBottom',
}

export interface Positions {
    [PositionTypeEnum.top]: ConnectedPosition;
    [PositionTypeEnum.bottom]: ConnectedPosition;
    [PositionTypeEnum.left]: ConnectedPosition;
    [PositionTypeEnum.right]: ConnectedPosition;
    [PositionTypeEnum.rightTop]: ConnectedPosition;
    [PositionTypeEnum.leftTop]: ConnectedPosition;
    [PositionTypeEnum.rightBottom]: ConnectedPosition;
}

export const positions: Positions = {
    [PositionTypeEnum.top]: {
        panelClass: ['top'],
        originX: 'center',
        overlayX: 'center',
        originY: 'top',
        overlayY: 'bottom',
        offsetY: -8,
    } as ConnectedPosition,
    [PositionTypeEnum.bottom]: {
        panelClass: ['bottom'],
        originX: 'center',
        overlayX: 'center',
        originY: 'bottom',
        overlayY: 'top',
        offsetY: 8,
    } as ConnectedPosition,
    [PositionTypeEnum.left]: {
        panelClass: ['left'],
        originX: 'start',
        overlayX: 'end',
        originY: 'center',
        overlayY: 'center',
        offsetX: -8,
    } as ConnectedPosition,
    [PositionTypeEnum.right]: {
        panelClass: ['right'],
        originX: 'end',
        overlayX: 'start',
        originY: 'center',
        overlayY: 'center',
        offsetX: 8,
    } as ConnectedPosition,
    [PositionTypeEnum.rightTop]: {
        panelClass: ['right'],
        originX: 'end',
        overlayX: 'start',
        originY: 'center',
        overlayY: 'top',
    } as ConnectedPosition,
    [PositionTypeEnum.leftTop]: {
        panelClass: ['left'],
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'top',
    } as ConnectedPosition,
    [PositionTypeEnum.rightBottom]: {
        panelClass: ['left'],
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'center',
    } as ConnectedPosition,
};

