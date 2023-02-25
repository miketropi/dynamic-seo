import { useState } from "react";
import {
  Card,
  Stack,
  FormLayout,
  Select,
  TextField,
  Button,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import {DeleteMinor,AddMajor} from '@shopify/polaris-icons';
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ShortcodesCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [inputFields, setInputFields] = useState([
    {slabel: '', svalue: ''}
  ])
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleSaveShortcodes = async () => {
    setIsLoading(true);
    const postBody = {
        type: "hot",
        limit: 10
    };
    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };
    console.log(requestMetadata);
    const response = await fetch("/api/shortcodes/save", requestMetadata);

    if (response.ok) {
      // await refetchProductCount();
      setIsLoading(false);
      setToastProps({ content: "Saved!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error saving shortcodes",
        error: true,
      });
    }
  };

  const handleFormChange = (index,name,value) => {
    let data = [...inputFields];
    if((!name || !value) && index != (inputFields.length - 1)){
      setToastProps({
        content: "The value must not be empty",
        error: true,
      });
    }else{
      data[index][name] = value;
      setInputFields(data);
    }
  }

  function ButtonAction(props) {
    if (!props.value || props.index == (inputFields.length - 1)) {
      return <Button icon={AddMajor} onClick={() => addFields(props.index)} accessibilityLabel="Add Fields" />
    }
    return (
      <Button icon={DeleteMinor} onClick={() => deleteFields(props.index)} accessibilityLabel="Delete Fields" />
    );
  }

  const addFields = (index) => {
    let newfield = { slabel: '', svalue: '' }
    let data = [...inputFields];
    if(!data[index].slabel || !data[index].svalue){
      setToastProps({
        content: "The value must not be empty",
        error: true,
      });
    }else{
      setInputFields([...inputFields, newfield])
    }
  }

  const deleteFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  return (
    <>
      {toastMarkup}
      <Card
        title="Shortcodes"
        sectioned
        primaryFooterAction={{
          content: "Save",
          onAction: handleSaveShortcodes,
          loading: isLoading,
        }}
      >
        <p style={{marginBottom: '30px'}}>View a summary of your online store’s performance.</p>
        <Stack wrap={false} alignment="leading" spacing="loose">
          <Stack.Item fill>
            <FormLayout>
              {inputFields.map((input, index) => {
                return (
                  <FormLayout.Group key={index} condensed>
                    <TextField fill
                      labelHidden
                      name="slabel"
                      label="Shortcode Name"
                      autoComplete="off"
                      placeholder="Example: [year]"
                      value={input.slabel}
                      onChange={value => handleFormChange(index, 'slabel', value)}
                    />
                    <TextField fill
                      labelHidden
                      name="svalue"
                      label="Shortcode Value"
                      autoComplete="off"
                      placeholder="Example: 2023"
                      value={input.svalue}
                      onChange={value => handleFormChange(index, 'svalue', value)}
                    />
                    <ButtonAction value={input.slabel} index={index}/>
                  </FormLayout.Group> 
                )
              })}
            </FormLayout>
          </Stack.Item>
        </Stack>
      </Card>
    </>
  );
}
