import { message } from 'antd';

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      type: 'info',
      content,
      duration: 1,
      style: {
        marginTop: '60px',
      },
    });
  };

  const hideMessage = () => {
    messageApi.destroy();
  };

  return {
    contextHolder,
    showMessage,
    hideMessage,
  };
};
