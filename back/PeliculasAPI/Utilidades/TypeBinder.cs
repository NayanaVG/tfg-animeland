using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json;

namespace PeliculasAPI.Utilidades
{
    public class TypeBinder: IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var nombrePropiedad = bindingContext.ModelName;
            var valor = bindingContext.ValueProvider.GetValue(nombrePropiedad);

            if (valor == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            try
            {
                // Obtenemos el tipo de dato de destino, enteros en este caso
                var tipoDestino = bindingContext.ModelMetadata.ModelType;

                // Pasamos de Json a un objeto, indicamos tipo destino y que no se tengan en cuenta las mayúsculas
                var valorDeserializado = JsonSerializer.Deserialize(valor.FirstValue!,
                    tipoDestino, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                bindingContext.Result = ModelBindingResult.Success(valorDeserializado);
            }
            catch
            {
                bindingContext.ModelState.TryAddModelError(nombrePropiedad, "El valor dado no es del tipo adecuado");
            }
            
            return Task.CompletedTask;
        } 
    }
}
