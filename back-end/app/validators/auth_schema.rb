class AuthSchema
  Register = Dry::Schema.Params do
    required(:email).filled(:string, format?: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i)
    required(:password).filled(:string, min_size?: 6)
    required(:primer_nombre).filled(:string)
    required(:primer_apellido).filled(:string)
    required(:cedula_identidad).filled(:string)
    optional(:segundo_nombre).maybe(:string)
    optional(:segundo_apellido).maybe(:string)
    optional(:telefono).maybe(:string)
  end

  Login = Dry::Schema.Params do
    required(:email).filled(:string)
    required(:password).filled(:string)
  end
end
