// REACT IMPORTS
import React, { FC } from 'react';

// PROJECT IMPORTS

import { ProfileEditView } from '@pages/ProfileEdit/ProfileEditView';
import { useEthers } from '@usedapp/core';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| PROFILE - EDIT - CONTAINER ||=========================== //

export const ProfileEditContainer: FC = (): JSX.Element => {
  const { account } = useEthers();

  const onSubmit = (values: any): void => {
    const formData = new FormData();
    // Avoid request if wallet isn't connected
    if (account === null) { return; }

    for (const [idx, value] of Object.entries(values)) {
      formData.append(idx, value as any);
    }
    // Dispatch action api call with creator append from wallet
    formData.append('creator', account ?? '');

    // send by ajax
  };

  return <ProfileEditView {...{ onSubmit, hash: account }} />;
};
