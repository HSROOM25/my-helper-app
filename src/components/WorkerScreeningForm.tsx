
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface WorkerScreeningFormProps {
  onSubmit: (data: any) => void;
}

interface ScreeningQuestion {
  id: string;
  question: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
  required: boolean;
}

const screeningQuestions: ScreeningQuestion[] = [
  {
    id: 'experience',
    question: 'How many years of experience do you have in this field?',
    type: 'radio',
    options: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
    required: true
  },
  {
    id: 'criminal',
    question: 'Do you have any criminal records?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'references',
    question: 'Can you provide references from previous employers?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true
  },
  {
    id: 'availability',
    question: 'What is your availability?',
    type: 'checkbox',
    options: ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'],
    required: true
  },
  {
    id: 'skills',
    question: 'Please list your relevant skills and qualifications:',
    type: 'text',
    required: true
  },
  {
    id: 'reason',
    question: 'Why do you want to work through our platform?',
    type: 'text',
    required: false
  }
];

const WorkerScreeningForm: React.FC<WorkerScreeningFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTextChange = (id: string, value: string) => {
    setAnswers({
      ...answers,
      [id]: value
    });
    
    // Clear error if field is filled
    if (value && errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const handleRadioChange = (id: string, value: string) => {
    setAnswers({
      ...answers,
      [id]: value
    });
    
    // Clear error since a selection has been made
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (id: string, option: string, checked: boolean) => {
    const currentSelections = answers[id] || [];
    let newSelections;
    
    if (checked) {
      newSelections = [...currentSelections, option];
    } else {
      newSelections = currentSelections.filter((item: string) => item !== option);
    }
    
    setAnswers({
      ...answers,
      [id]: newSelections
    });
    
    // Clear error if at least one option is selected
    if (newSelections.length > 0 && errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    screeningQuestions.forEach(q => {
      if (q.required) {
        const value = answers[q.id];
        
        if (!value) {
          newErrors[q.id] = 'This field is required';
        } else if (q.type === 'checkbox' && Array.isArray(value) && value.length === 0) {
          newErrors[q.id] = 'Please select at least one option';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(answers);
      toast({
        title: "Screening submitted",
        description: "Your screening information has been successfully submitted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Worker Screening</CardTitle>
          <CardDescription>
            Please complete all required screening questions below. This information helps employers make informed decisions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {screeningQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label htmlFor={q.id} className="font-medium">
                  {q.question} {q.required && <span className="text-red-500">*</span>}
                </Label>
                
                {q.type === 'text' && (
                  <Textarea
                    id={q.id}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    className={errors[q.id] ? 'border-red-500' : ''}
                  />
                )}
                
                {q.type === 'radio' && q.options && (
                  <RadioGroup
                    value={answers[q.id] || ''}
                    onValueChange={(value) => handleRadioChange(q.id, value)}
                    className={errors[q.id] ? 'border-red-500 rounded p-2' : ''}
                  >
                    {q.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                        <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {q.type === 'checkbox' && q.options && (
                  <div className={`space-y-2 ${errors[q.id] ? 'border-red-500 border rounded p-2' : ''}`}>
                    {q.options.map((option) => {
                      const isChecked = Array.isArray(answers[q.id]) && answers[q.id].includes(option);
                      return (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${q.id}-${option}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(q.id, option, checked as boolean)
                            }
                          />
                          <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {errors[q.id] && (
                  <p className="text-red-500 text-sm">{errors[q.id]}</p>
                )}
              </div>
            ))}
            
            <div className="pt-4">
              <Button type="submit" className="w-full">Submit Screening</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerScreeningForm;
