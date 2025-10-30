import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Label from "../form/label";
import Input from "../form/input";
import TextArea from "../form/text-area";
import ErrorMessage from "../form/error-message";
import FieldGroup from "../form/field-group";
import Button from "../button";
import storeEvent from "../../services/event/applications/store-event.service";
import {
  createEventSchema,
  type TCreateEventSchema,
} from "../../schemas/event/create-event.schema";

export default function CreateEvent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCreateEventSchema>({ resolver: zodResolver(createEventSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: storeEvent,
    onSuccess: () => {
      toast.success("Evento criado com sucesso.");
      reset();
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Erro ao criar evento:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao criar evento. Por favor, tente novamente.");
      }
    },
  });

  const onSubmit = (data: TCreateEventSchema) => {
    mutate(data);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 py-5 border border-neutral-200 rounded-xl shadow flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold">Criar novo evento</h2>
      <FieldGroup>
        <Label htmlFor="title" label="Título" required />
        <Input
          {...register("title")}
          id="title"
          placeholder="Ex.: NLW Connect"
          disabled={isLoading}
        />
        {errors.title?.message && (
          <ErrorMessage message={errors.title.message} />
        )}
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="details" label="Detalhes" required />
        <TextArea
          {...register("details")}
          id="details"
          rows={4}
          placeholder="Ex.: Crie um projeto em apenas três aulas gratuitas: nessa edição vamos codar o DevStage."
          disabled={isLoading}
        ></TextArea>
        {errors.details?.message && (
          <ErrorMessage message={errors.details.message} />
        )}
      </FieldGroup>
      <FieldGroup>
        <Label
          htmlFor="maximunAttendees"
          label="Máximo de participantes"
          required
        />
        <Input
          {...register("maximunAttendees", { valueAsNumber: true })}
          type="number"
          id="maximunAttendees"
          min={1}
          step={1}
          placeholder="Ex.: 100"
          disabled={isLoading}
        />
        {errors.maximunAttendees?.message && (
          <ErrorMessage message={errors.maximunAttendees.message} />
        )}
      </FieldGroup>
      <div className="flex gap-4">
        <Link to="/">
          <Button color="secondary">Cancelar</Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar evento"}
        </Button>
      </div>
    </form>
  );
}
