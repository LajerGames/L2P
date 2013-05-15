<?php
class Form
{
	private	$arrFields	        = array();

	public	$strMode		    = '',
			$strAction		    = '',
			$bIsPostMethod	    = true,
			$arrProperties	    = array(),
			$strClass		    = '',
			$bIsValid		    = true;

	/**
	* Constructs the form object
	*
	* @param string $strMode
	* @param string $strAction
	* @param bool $bIsPostMethod
	* @param array $arrProperties
	* @param string $strClass
	* @return Form
	*/
	public function __construct($strMode = '', $strAction = '', $bIsPostMethod = true, $arrProperties = array(), $strClass = 'form-horizontal')
	{
		$this->strMode			= $strMode;
		$this->strAction		= $strAction;
		$this->bIsPostMethod	= $bIsPostMethod;
		$this->arrProperties	= $arrProperties;
		$this->strClass			= $strClass;

		return $this;
	}

	/**
	* Add a field to the form
	*
	* @param FormField $oField
	* @return Form
	*/
	private function AddField($oField)
	{
		$oField->oForm	= $this;
		$this->arrFields[$oField->strName]	= $oField;

		return $this;
	}

	/**
	* Adds a text field
	*
	* @param string $strName
	* @param string $strValue
	* @param string $strLabel
	* @param FormFieldValidation $oValidation
	* @param string $strType
	* @param bool $bHasSubmitButton
	* @param array $arrProperties
	* @return Form
	*/
	public function TextField($strName, $strValue, $strLabel = '', $oValidation = null, $strType = 'text', $bHasSubmitButton = false, $arrProperties = array())
	{
		if(empty($strType))
		{
			$strType	= 'text';
		}

		$oField	= new FormField(FormField::FieldType_Text);
		$oField->strName			= $strName;
		$oField->strValue			= $strValue;
		$oField->strLabel			= $strLabel;
		$oField->oValidation		= $oValidation;
		$oField->strType			= $strType;
		$oField->bHasSubmitButton	= $bHasSubmitButton;
		$oField->arrProperties		= $arrProperties;

		$this->AddField($oField);

		return $this;
	}

    public function Box($bIsRadio, $strName, $bIsChecked, $strLabel = '', $arrProperties = array())
    {
        $strType = $bIsRadio ? FormField::FieldType_Radio : FormField::FieldType_Checkbox;

        $strName = empty($strName) ? 'unnamed' : $strName;

        $oField     = new FormField($strType);
        $oField->strName        = $strName;
        $oField->strValue       = 1;
        $oField->bIsChecked     = $bIsChecked;
        $oField->strLabel       = $strLabel;
        $oField->oValidation    = $oValidation;
        $oField->arrProperties  = $arrProperties;

        $this->AddField($oField);

        return $this;
    }

	/**
	* Adds a button
	*
	* @param string $strName
	* @param string $strValue
	* @param bool $bIsSubmit
	* @param array $arrProperties
	* @return FormField
	*/
	public function Button($strName, $strValue, $bIsSubmit = true, $arrProperties = array())
	{
		$oField	= new FormField(FormField::FieldType_Button);
		$oField->strName		= $strName;
		$oField->strValue		= $strValue;
		$oField->bIsSubmit		= $bIsSubmit;
		$oField->arrProperties	= $arrProperties;

		$this->AddField($oField);

		return $oField;
	}

	/**
	* Returns the field
	*
	* @param string $strName
	* @return FormField
	*/
	public function ReturnField($strName)
	{
		return $this->arrFields[$strName];
	}

	/**
	* Renders the start of the form
	*
	* @return string
	*/
	public function RenderFormStart()
	{
		$strAction = !empty($this->strAction) ? 'action="'.$this->strAction.'"' : '';
		$strMethod = $this->bIsPostMethod ? 'post' : 'get';

		return '
		<form '.$strAction.' method="'.$strMethod.'" '.RenderProperties($this->arrProperties).' class="'.$this->strClass.'" />
			<fieldset>
				<input type="hidden" name="mode" value="'.$this->strMode.'" />
		';
	}

	/**
	* Ends a form, and is able to render a nice bottom sumbit area if we wish it to
	*
	* @param bool $bIncludeSubmitArea
	* @param string $strSubmitButtonName
	* @param string $strCancelButtonName
	* @return string
	*/
	public function RenderFormEnd($bIncludeSubmitArea = true, $strSubmitButtonName = 'Save changes', $strCancelButtonName = '')
	{
		$strCancelButton = empty($strCancelButtonName) ? '' : $this->Button('cancel', $strCancelButtonName, false)->RenderField();

		$strSubmitArea = $bIncludeSubmitArea ? '
			<div class="form-actions">
				'.$this->Button('submit', $strSubmitButtonName, true)->RenderField().'
				'.$strCancelButton.'
			</div>
		' : '';

		return '
				'.$strSubmitArea.'
            </fieldset>
			</fieldset>
		</form>
		';
	}

	/**
	* Will return all fields
	*
	* @return string
	*/
	public function RenderFields($bIncludeSubmitArea = true, $strSubmitButtonName = 'Save changes', $strCancelButtonName = '', $bUseTableView = false)
	{
		$strHtml	= $this->RenderFormStart();

        if($bUseTableView)
        {
            $strHtml .= '<table border="0" cellspacing="0" cellpadding="0" class="FormTable">';
            foreach($this->arrFields as $strName => $oField)
            {
                $strHtml    .= '
                    <tr>
                        <td>'.$oField->strLabel.'</td>
                        <td>'.$oField->RenderField().'</td>
                    </tr>
                ';
            }
            $strHtml .= '</table>';
        }
        else
        {
            foreach($this->arrFields as $strName => $oField)
            {
                $strHtml    .= $oField->RenderField();
            }
        }
		$strHtml	.= $this->RenderFormEnd($bIncludeSubmitArea, $strSubmitButtonName, $strCancelButtonName);

		return $strHtml;
	}

	/**
	* Will try to validate the form
	*
	* @param array $arrData
	* @return bool
	*/
	public function Validate($arrData)
	{
		foreach($this->arrFields as $strName => $oField)
		{
			if(!$oField->Validate($arrData[$strName]))
			{
				$this->bIsValid	= false;
			}
		}

		return $this->bIsValid;
	}
}

class FormField
{
	const	FieldType_Text		= 'text',
			FieldType_Number	= 'number',
			FieldType_Password	= 'password',
            FieldType_Button    = 'button',
            FieldType_Radio     = 'radio',
			FieldType_Checkbox	= 'checkbox',
			FieldType_Date		= 'date';

	public	$strFieldType		= '',
			$strName			= '',
            $strValue           = '',
			$bIsChecked			= false,
			$strLabel			= '',
			$strType			= '',
			$strPattern			= '',
			$oValidation		= null,
			$bRequired			= false,
			$bIsSubmit			= false,
			$bHasSubmitButton	= false,
			$arrProperties		= array(),
			$bIsValid			= true,
			$oForm				= null;

	/**
	* Contructs the FormField
	*
	* @param FormField_FieldType $strFieldType
	* @return FormField
	*/
	public function __construct($strFieldType)
	{
		$this->strFieldType	= $strFieldType;

		return $this;
	}

	/**
	* Render the field
	*
	* @return string
	*/
	public function RenderField()
	{
		$strHtml	= '';

		switch($this->strFieldType)
		{
			case FormField::FieldType_Text:
				$strHtml	.= $this->RenderTextField();
				break;
			case FormField::FieldType_Button:
				$strHtml	.= $this->RenderButton();
				break;
            case FormField::FieldType_Checkbox :
                $strHtml    .= $this->RenderCheckbox();
                break;
            case FormField::FieldType_Radio :
            
                break;
		}

		return $strHtml;
	}

	/**
	* Is this field valid?
	*
	* @param string $strValue
	* @return bool
	*/
	public function Validate($strValue)
	{
		if(!($this->strFieldType === FormField::FieldType_Text && $this->strType === 'password'))
		{
			$this->strValue	= $strValue;
		}

		if(is_object($this->oValidation))
		{
			if($this->oValidation->bRequired || !empty($strValue))
			{
				if($this->strFieldType === FormField::FieldType_Text && $this->strType === 'email')
				{
					if(filter_var($strValue, FILTER_VALIDATE_EMAIL) === false)
					{
						$this->SetValidationError('Fejl', $this->oValidation->strError, $this->oValidation->bClearOnError);
					}
				}
				else
				{
					$arrMatches	= array();

					preg_match('/^'.$this->oValidation->strPattern.'$/', $strValue, $arrMatches);

					if(count($arrMatches) !== 1)
					{
						$this->SetValidationError('Fejl', $this->oValidation->strError, $this->oValidation->bClearOnError);
					}
				}
			}
		}

		return $this->bIsValid;
	}

	/**
	* Set Validation Error for the field
	*
	* @param string $strBody
	* @param bool $bClearValue
	* @return FormField
	*/
	public function SetValidationError($strBody = 'Udfyld feltet korrekt', $bClearValue = true)
	{
		$this->arrProperties['data-content']		= $strBody;
		if($bClearValue)
		{
			$this->ClearValue();
		}
		$this->bIsValid			= false;
		$this->oForm->bIsValid	= false;

		return $this;
	}

	public function ClearValue()
	{
		$this->strValue	= '';

		return $this;
	}

	/**
	* Render the text field
	*
	* @param FormField $oField
	* @return string
	*/
	private function RenderTextField()
	{
		$strExtraNodes	= '';

		$strLabel = empty($this->strLabel) ? ucfirst($this->strName) : $this->strLabel;
		// Check if we have an error in this field
		$arrAddClass = array(
			'main-div'  => '',
			'label'     => 'focusedInput'
		);
		$strAddErrorMessage = '';
		if(isset($this->arrValidationErrors[$this->strName]))
		{
			$strAddErrorMessage = 'data-popover="'.$this->arrValidationErrors[$this->strName]['description'].'"';
		}

		// Submit button
		if($this->bHasSubmitButton)
		{
			$strExtraNodes = '<button type="submit" class="imgSubmit"><img src="'.HTTP_PROJECT_ROOT_IMG.'icons/submit.svg" alt="" /></button>';
		}

		$arrProperties	= $this->arrProperties;
		if(is_object($this->oValidation))
		{
			$arrProperties	= array_merge($arrProperties, $this->oValidation->CreateProperties());
		}

		$strRtrn = '
		<div class="inputContainer">
			<input type="'.$this->strType.'" name="'.$this->strName.'" title="'.$this->oValidation->strError.'" value="'.$this->strValue.'" x-moz-errormessage="'.$this->oValidation->strError.'" placeholder="'.$strLabel.'" data-value="'.$strLabel.'" '.$strAddErrorMessage.' '.RenderProperties($arrProperties).' class="std" />
			'.$strExtraNodes.'
		</div>
		';

		return $strRtrn;
	}

    private function RenderCheckbox()
    {
        $strChecked = $this->bIsChecked ? 'checked="checked"' : '';

        if(empty($this->strLabel))
        {
            $strRtrn = '<input type="checkbox" value="'.$this->strValue.'" name="'.$this->strName.'" '.$strChecked.' />';
        }
        else
        {
            $strRtrn = '
            <label class="checkbox">
              <input type="checkbox" value="'.$this->strValue.'" id="'.$this->strName.'" name="'.$this->strName.'" '.$strChecked.' /> '.$this->strLabel.'
            </label>
            ';
        }

        return $strRtrn;
    }

	/**
	* Render the button
	*
	* @return string
	*/
	private function RenderButton()
	{
		$arrProperties	= $this->arrProperties;

		if(empty($arrProperties['class']))
		{
			$arrProperties['class']	= '';
		}

		$strType        		= $this->bIsSubmit ? 'submit' : 'button';
		$arrProperties['class']	.= ' btn';
		$arrProperties['class']	.= $this->bIsSubmit ? ' btn-primary' : '';
		return '<button name="'.$this->strName.'" type="'.$strType.'" '.RenderProperties($arrProperties).'>'.$this->strValue.'</button>';
	}

	/**
	* Always returns POST value on a given field unless POST value is empty or type is password
	*
	* @param string $strValue
	* @param string $strPostValue
	* @param string $strInputType
	* @return string
	*/
	private function GetInputValue($strValue, $strPostValue, $strInputType = '')
	{
		return (empty($strPostValue) || $strInputType == 'password') ? $strValue : $strPostValue;
	}
}

class FormFieldValidation
{
	public	$bRequired		= true,
			$strPattern		= '',
			$strError		= '',
			$bClearOnError	= true;

	/**
	* Creates the FormFieldValidation
	*
	* @param bool $bRequired
	* @param string $strPattern
	* @param string $strError
	* @param bool $bClearOnError
	* @return FormFieldValidation
	*/
	public function __construct($bRequired = true, $strPattern = '', $strError = '', $bClearOnError = true)
	{
		$this->bRequired		= $bRequired;
		$this->strPattern		= $strPattern;
		$this->strError			= $strError;
		$this->bClearOnError	= $bClearOnError;

		return $this;
	}

	/**
	* Will create a array of properties for the input/select tag
	*
	* @return array
	*/
	public function CreateProperties()
	{
		$arrProperties	= array();
		if($this->strPattern !== '')
		{
			$arrProperties['pattern']	= $this->strPattern;
		}
		if($this->bRequired)
		{
			$arrProperties['required']	= 'required';
		}

		return $arrProperties;
	}
}

/**
* This will keep track of initiated forms, and only create a new instance of a form if it's not already initialized
*
* @param string $strMode
* @param string $strFormname
* @param string $strAction
* @param bool $bIsPostMethod
* @param array $arrProperties
* @param string $strClass
*/
/*
function InitiateForm($oFormInstance, $strFormname, $strMode = '', $strAction = '', $bIsPostMethod = true, $arrProperties = array(), $strClass = 'form-horizontal')
{
    global $arrInitiatedForms;

    if(!in_array($strFormname, $arrInitiatedForms))
    {
        $arrInitiatedForms[] = $strFormname;

        $oForm = new Form($strMode, $strAction, $bIsPostMethod, $arrProperties, $strClass);
    }
    else
    {
        // If it's already initiated, just keep the instance
        $oForm = $oFormInstance;
    }

    return $oForm;
}*/
?>