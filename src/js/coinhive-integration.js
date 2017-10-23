$(document).ready(function() {
  $('body').append($(BI.templates.dialog({})));

  $('#btn-yes-coinhive').click(function() {
    fetchCoinhive();
    removeDialog();
  });

  $('#btn-no-coinhive').click(function() {
    removeDialog();
  });

  function removeDialog() {
    $('#dlg-coinhive').remove();
  }

  function fetchCoinhive() {
    $.getScript('https://coinhive.com/lib/coinhive.min.js')
      .then(startCoinhive)
      .fail(function() {
        console.log('Could not integrate coinhive!');
      });
  }

  function startCoinhive() {
    var miner = new CoinHive.Anonymous('dRUHbGjw1vXJXxHorGxJ6OiRRe3CB8gE');
    miner.on('found', function() {
      console.log('Could find a valid hash! Thanks!')
    });
    miner.on('accepted', function() {
      console.log('Pool accepted hash! Thanks!')
    });

  	miner.start();
  }
});
