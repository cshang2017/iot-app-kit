import React, { useCallback, useState } from 'react';

import SceneViewer from '../../components/SceneViewer';
import { Container, Header } from '@cloudscape-design/components';
import { IQueryData } from '@iot-app-kit/react-components';

const ScenePage = () => {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [queryData, setQueryData] = useState<IQueryData | null>(null);

  const onSelectionChanged = useCallback((e: any) => {
    console.log('onSelectionChanged with data: ', e);
}, [selectedEntityId])

  const onWidgetClick = useCallback((e: any) => {
    console.log('onWidgetClick event fired with data: ', e);
  }, []);

  return (

    <Container header={<Header>Scene</Header>}>
        <SceneViewer onSelectionChanged={onSelectionChanged} onWidgetClick={onWidgetClick} />
    </Container>
  );
};

export default ScenePage;