import unittest
from main import search_by_id_or_name

class Test(unittest.TestCase):
  def test_Professor(self):
    return self.assertEqual(search_by_id_or_name('004'), '{"_id": {"$oid": "63faf80d5c796a6d29297564"}, "Member ID": "004", "name": "Yu Sun", "occupation": "Professor"}')
  
  # def test2_Octagon(self):
  #   self.assertEqual(perimeterOctagon('guppy '), 16)