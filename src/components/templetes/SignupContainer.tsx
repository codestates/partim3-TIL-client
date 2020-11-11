import React from 'react';
import Button from '../UI/atoms/Button';
import Text from '../UI/atoms/Text';
import FormBoot from '../UI/atoms/FormBoot';

export default function SignupContainer() {
  return (
    <div>
      <Button color="red"></Button>
      <Text text="red"></Text>
      <Text text="kkk"></Text>
      <FormBoot type="email" placeholder="email"></FormBoot>
      <FormBoot type="nickname" placeholder="nickname"></FormBoot>
      <FormBoot type="password" placeholder="password"></FormBoot>
    </div>
  );
}
