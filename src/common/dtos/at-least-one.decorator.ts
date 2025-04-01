import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function AtLeastOne(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOne',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedPropertyName = args.constraints[0];
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value || relatedValue; // Ensures at least one is present
        },
        defaultMessage(): string {
          return 'Either phone or email must be provided.';
        },
      },
    });
  };
}
