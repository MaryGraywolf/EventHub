import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InfoCard from "../info-card";
import Label from "../../form/label";
import Input from "../../form/input";
import ErrorMessage from "../../form/error-message";
import FieldGroup from "../../form/field-group";
import Button from "../../button";
import storeEventAttendee from "../../../services/event/applications/store-event-attendee.service";
import {
  registerAttendeeSchema,
  type TRegisterAttendeeSchema,
} from "../../../schemas/event/register-attendee.schema";

type TProps = { eventId: string };

export default function RegisterInfoCard({ eventId }: TProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterAttendeeSchema>({
    resolver: zodResolver(registerAttendeeSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TRegisterAttendeeSchema) =>
      storeEventAttendee({ eventId, ...data }),
    onSuccess: () => {
      toast.success("Inscrição realizada com sucesso!");
      reset();
    },
    onError: (error: any) => {
      console.error("Erro ao se inscrever:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Erro ao se inscrever no evento. Por favor, tente novamente.",
        );
      }
    },
  });

  const onSubmit = (data: TRegisterAttendeeSchema) => {
    mutate(data);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <InfoCard title="Inscreva-se agora">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-64 flex flex-col gap-4"
      >
        <FieldGroup>
          <Label htmlFor="name" label="Nome completo" required />
          <Input
            {...register("name")}
            id="name"
            placeholder="Ex.: John Doe"
            disabled={isLoading}
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email" label="E-mail" required />
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Ex.: john.doe@example.com"
            disabled={isLoading}
          />
          {errors.email?.message && (
            <ErrorMessage message={errors.email.message} />
          )}
        </FieldGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Inscrevendo..." : "Inscrever-se"}
        </Button>
      </form>
    </InfoCard>
  );
}
