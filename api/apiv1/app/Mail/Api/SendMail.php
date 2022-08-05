<?php

namespace App\Mail\Api;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $title;
    public $detalhes;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($title, $detalhes)
    {
        $this->title = $title;
        $this->detalhes = $detalhes;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //return $this->view('view.name');
        return $this
        ->subject($this->title)
        ->view('resetpassword_mail')
        ->to($this->detalhes['email']);
    }
}