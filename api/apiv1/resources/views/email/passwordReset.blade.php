@component('mail::message')
# Redefinir Senha

Alguém solicitou uma redefinição de senha para sua conta na Aprotex. Clique no botão abaixo para definir uma nova senha:

@component('mail::button', ['url' => 'https://api.easyobrastecnologia.com.br/response-password-reset?token='.$token])
Clique aqui
@endcomponent

Atenciosamente,<br>
{{ config('app.name') }}
@endcomponent
