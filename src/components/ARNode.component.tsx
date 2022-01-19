import {
  Viro3DObject,
  ViroNode,
  ViroSpotLight,
} from '@viro-community/react-viro';
import React from 'react';

interface Props {
  nodeRef: React.RefObject<ViroNode>;
  onDrag?(coords: number[]): void;
}

const ARNode: React.FC<Props> = ({nodeRef, onDrag, children}) => {
  return (
    <ViroNode
      ref={nodeRef}
      position={[0, 0, -1]}
      visible={false}
      onClick={() => {}}
      onDrag={onDrag || (() => {})}
      dragType="FixedToWorld">
      <ViroSpotLight
        innerAngle={5}
        outerAngle={45}
        direction={[0, -1, -0.2]}
        position={[0, 3, 0]}
        color="#ffffff"
        castsShadow={true}
        influenceBitMask={2}
        shadowMapSize={2048}
        shadowNearZ={2}
        shadowFarZ={5}
        shadowOpacity={0.7}
      />

      <Viro3DObject
        source={require('../res/emoji_smile/emoji_smile.vrx')}
        position={[0, 0, 0]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
        lightReceivingBitMask={3}
        shadowCastingBitMask={2}
        transformBehaviors={['billboardY']}
        resources={[
          require('../res/emoji_smile/emoji_smile_diffuse.png'),
          require('../res/emoji_smile/emoji_smile_specular.png'),
          require('../res/emoji_smile/emoji_smile_normal.png'),
        ]}
      />

      {children}
    </ViroNode>
  );
};

export default ARNode;
