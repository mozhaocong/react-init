import { Components } from '@ht/common-modules';
import React, { useMemo, useState } from 'react';
const {
  LoadingButton
} = Components;
const View = properties => {
  const {
    onClick: propertyOnClick,
    loading: propertyLoading,
    ...attributes
  } = properties;
  const [loading, setLoading] = useState(false);
  const loadingData = useMemo(() => {
    return propertyLoading ?? loading;
  }, [loading, propertyLoading]);
  function onClick(event) {
    propertyOnClick?.(event, setLoading);
  }
  // return <Button {...{ ...attributes, loading: loadingData, onClick }} />

  return <LoadingButton {...{
    ...attributes,
    loading: loadingData,
    onClick
  }} />;
};
export default React.memo(View);