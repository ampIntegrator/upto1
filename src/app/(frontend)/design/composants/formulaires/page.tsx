/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import CalendarShowcase from '../../_showcases/CalendarShowcase';
import CheckboxInputShowcase from '../../_showcases/CheckboxInputShowcase';
import CheckboxListShowcase from '../../_showcases/CheckboxListShowcase';
import CheckboxListItemShowcase from '../../_showcases/CheckboxListItemShowcase';
import DateInputShowcase from '../../_showcases/DateInputShowcase';
import DateRangeInputShowcase from '../../_showcases/DateRangeInputShowcase';
import DateTimeInputShowcase from '../../_showcases/DateTimeInputShowcase';
import FieldShowcase from '../../_showcases/FieldShowcase';
import FieldLabelShowcase from '../../_showcases/FieldLabelShowcase';
import FieldStatusShowcase from '../../_showcases/FieldStatusShowcase';
import FileInputShowcase from '../../_showcases/FileInputShowcase';
import FormLayoutShowcase from '../../_showcases/FormLayoutShowcase';
import InputGroupShowcase from '../../_showcases/InputGroupShowcase';
import NumberInputShowcase from '../../_showcases/NumberInputShowcase';
import PowerSearchShowcase from '../../_showcases/PowerSearchShowcase';
import RadioListShowcase from '../../_showcases/RadioListShowcase';
import RadioListItemShowcase from '../../_showcases/RadioListItemShowcase';
import SelectShowcase from '../../_showcases/SelectShowcase';
import SliderShowcase from '../../_showcases/SliderShowcase';
import SwitchShowcase from '../../_showcases/SwitchShowcase';
import TextAreaShowcase from '../../_showcases/TextAreaShowcase';
import TextInputShowcase from '../../_showcases/TextInputShowcase';
import TimeInputShowcase from '../../_showcases/TimeInputShowcase';

export const metadata = {title: 'Formulaires — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 23" title="Formulaires" lead="Champs, sélecteurs et contrôles de saisie." />
      <ShowcaseBlock name="Calendar" id="calendar" doc="calendar">
        <CalendarShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CheckboxInput" id="checkbox-input" doc="checkbox-input" dressed>
        <CheckboxInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CheckboxList" id="checkbox-list" doc="checkbox-list">
        <CheckboxListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CheckboxListItem" id="checkbox-list-item" doc="checkbox-list" parent="CheckboxList">
        <CheckboxListItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DateInput" id="date-input" doc="date-input" dressed>
        <DateInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DateRangeInput" id="date-range-input" doc="date-range-input" dressed>
        <DateRangeInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DateTimeInput" id="date-time-input" doc="date-time-input" dressed>
        <DateTimeInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Field" id="field" doc="field">
        <FieldShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="FieldLabel" id="field-label" doc="field" parent="Field">
        <FieldLabelShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="FieldStatus" id="field-status" doc="field" parent="Field">
        <FieldStatusShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="FileInput" id="file-input" doc="file-input" dressed>
        <FileInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="FormLayout" id="form-layout" doc="form-layout" dressed>
        <FormLayoutShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="InputGroup" id="input-group" doc="input-group" dressed>
        <InputGroupShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="NumberInput" id="number-input" doc="number-input" dressed>
        <NumberInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="PowerSearch" id="power-search" doc="power-search" dressed>
        <PowerSearchShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="RadioList" id="radio-list" doc="radio-list" dressed>
        <RadioListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="RadioListItem" id="radio-list-item" doc="radio-list" parent="RadioList">
        <RadioListItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Select" id="select" doc="selector" dressed>
        <SelectShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Slider" id="slider" doc="slider" dressed>
        <SliderShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Switch" id="switch" doc="switch" dressed>
        <SwitchShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TextArea" id="text-area" doc="text-area" dressed>
        <TextAreaShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TextInput" id="text-input" doc="text-input" dressed>
        <TextInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TimeInput" id="time-input" doc="time-input" dressed>
        <TimeInputShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
