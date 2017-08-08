$('.login').on('submit', function(e) {
                          e.preventDefault();
                          var $this = $(this), $state = $this.find('button > .state');
                          $this.addClass('loading');
                          $state.html('Chargement');
                          setTimeout(function() {
                                      $this.addClass('ok');
                                      $state.html('Connecté!');
                                      setTimeout(function() {
                                                  $this.removeClass('ok loading');
                                                }, 4000);
                                    }, 3000);
                        });